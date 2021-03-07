import firebase from "firebase";

// 諸々初期化処理
const dbInstance: any = require("./dbInstance");
const functions: any = require("firebase-functions");
const serviceAccount: object = require("./serviceAccount.json");
const admin: any = require("firebase-admin");

let adminConfig: any = {};
if (process.env.FIREBASE_CONFIG)
  adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
const adminApp: firebase.app.App = admin.initializeApp(adminConfig);
// const db = functions.database;
const db: any = functions.database.instance(dbInstance);
const adminDb: any = adminApp.database();
// const auth: firebase.auth.Auth = functions.auth;

// exports.onCreateUser = auth.user().onCreate((user) => {
//   const usersRef = adminDb.ref("users");
//   const saveVal = {};
//   const uid = user.uid;
//   saveVal[uid] = {
//     email: user.email,
//   };
//   return usersRef.update(saveVal);
// });

interface NotififyParams {
  toId: string;
  fromId: string;
}

interface DirectChatParams {
  body: string;
  timestamp: number;
  which: string;
}

interface GroupParams {
  groupName: string;
  memberIds: {
    [memberId: string]: 0;
  };
  isDelete?: boolean;
}

exports.onCreateDirectChat = db
  .ref("/chat/direct/{userId}/{partnerId}/{chatId}")
  .onCreate((snapshot: firebase.database.DataSnapshot, context: any) => {
    console.log("snapshot", JSON.stringify(snapshot));
    console.log("context", JSON.stringify(context));
    const value: DirectChatParams = snapshot.val();
    if (value.which === "you") {
      return null;
    }
    console.log("snapshot.val()", value);
    console.log("context", JSON.stringify(context));
    const { userId, partnerId, chatId } = context.params;
    const { body, timestamp } = value;
    const saveVal: DirectChatParams = {
      body,
      timestamp,
      which: "you",
    };
    const promises: Array<Promise<any>> = [];
    const notifyParams: NotififyParams = {
      fromId: userId,
      toId: partnerId,
    };
    promises.push(notify("chat-direct", notifyParams));
    const pairChatRef: any = adminDb.ref(
      `/chat/direct/${partnerId}/${userId}/${chatId}`
    );
    promises.push(pairChatRef.set(saveVal));
    return Promise.all(promises);
  });

exports.onCreateGroupsChat = db
  .ref("chat/groups/{groupId}/{chatId}")
  .onCreate((_: any, context: any) => {
    console.log("context", JSON.stringify(context));
    const { uid } = context.auth;
    const { groupId } = context.params;
    const promises: Array<Promise<any>> = [];
    return adminDb
      .ref(`groups/${groupId}`)
      .once("value", (snapshot: firebase.database.DataSnapshot) => {
        const value = snapshot.val();
        const { memberIds } = value;
        for (const memberId of Object.keys(memberIds)) {
          if (memberId === uid) continue;
          const notifyParams: NotififyParams = {
            toId: memberId,
            fromId: groupId,
          };
          promises.push(notify("chat-groups", notifyParams));
        }
        return Promise.all(promises);
      });
  });

const notify = (type: string, params: NotififyParams): Promise<any> => {
  const { fromId, toId } = params;
  const notifyRef: any = adminDb.ref(`notifications/${toId}`);
  const newNotifyKey: string = notifyRef.push().key;
  return notifyRef.child(newNotifyKey).set({
    type,
    fromId,
  });
};

const writeUsersGroupIds = (uid: string, gid: string, type: string) => {
  if (type === "remove") {
    return adminDb.ref(`users/${uid}/groupIds/${gid}`).remove();
  } else {
    return adminDb.ref(`users/${uid}/groupIds/${gid}`).set(0);
  }
};

exports.onWriteGroup = db
  .ref("groups/{groupId}")
  .onWrite((change: any, context: any) => {
    console.log("chage", JSON.stringify(change));
    console.log("context", JSON.stringify(context));
    const { uid } = context.auth;
    const prevVal: GroupParams = change.before.val() || {};
    const aftVal: GroupParams = change.after.val() || {};
    const prevMemberIds: Array<string> = Object.keys(prevVal.memberIds || {});
    const aftMemberIds: Array<string> = Object.keys(aftVal.memberIds || {});
    let isDeletePhysical: boolean = false;
    if (aftMemberIds.length === 0) isDeletePhysical = true;
    const { isDelete } = aftVal;
    const { groupId } = context.params;
    const promises: Array<Promise<any>> = [];
    if (!isDeletePhysical) {
      if (isDelete) {
        promises.push(writeUsersGroupIds(uid, groupId, "remove"));
        for (const prevMemberId of prevMemberIds) {
          if (prevMemberId !== uid) {
            const notifyParams: NotififyParams = {
              fromId: groupId,
              toId: prevMemberId,
            };
            promises.push(notify("delete-group", notifyParams));
            promises.push(writeUsersGroupIds(prevMemberId, groupId, "remove"));
          }
        }
      } else {
        promises.push(writeUsersGroupIds(uid, groupId, "set"));
        for (const aftMemberId of aftMemberIds) {
          if (!(aftMemberId === uid || prevMemberIds.includes(aftMemberId))) {
            const notifyParams: NotififyParams = {
              fromId: groupId,
              toId: aftMemberId,
            };
            promises.push(notify("entry-group", notifyParams));
            promises.push(writeUsersGroupIds(aftMemberId, groupId, "set"));
          }
        }
        for (const prevMemberId of prevMemberIds) {
          if (!(aftMemberIds.includes(prevMemberId) || prevMemberId === uid)) {
            const notifyParams: NotififyParams = {
              fromId: groupId,
              toId: prevMemberId,
            };
            promises.push(notify("leave-group", notifyParams));
            promises.push(writeUsersGroupIds(prevMemberId, groupId, "remove"));
          }
        }
      }
    }
    return Promise.all(promises);
  });

// pubsub は 無料枠を超えてしまうので、記述だけ。
// 毎月1日 0時0分 毎に isDelete フラグがついたGroupの物理削除を行う関数。

// exports.deleteGroupsPhisically =
//   functions.pubsub.schedule("0 0 1 * *").onRun(() => {
//   adminDb.ref("groups").once("value", (snapshot) => {
//     const groups = snapshot.val();
//     const promises = [];
//     for (const gid of Object.keys(groups)) {
//       if (groups[gid].isDelete) {
//         const deleteGroupRef = adminDb.ref(`groups/${gid}`);
//         promises.push(deleteGroupRef.remove());
//       }
//     }
//     return Promise.all(promises);
//   });
// });
