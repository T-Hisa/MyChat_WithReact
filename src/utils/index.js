export const renderImage = url =>  <img src={url} alt="サムネイル" />

export const devideByNoticeType = (notice, users, groups, history) => {
  let fromName, displayWord, handleClickEvent
  const { type, fromId } = notice
  switch(type) {
    case "chat-direct":
        fromName = users[fromId].username
        displayWord = fromName + "からチャットが届いています"
        handleClickEvent = () => {
          history.push(`/direct/${fromId}`)
        }
        break
      case "chat-group":
        fromName = (groups[fromId] || {}).groupName
        displayWord = fromName + "でチャットがありました"
        handleClickEvent = () => {
          history.push(`/groupchat/${fromId}`)
        }
        break
      case "entry-group":
        fromName = (groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」に参加しました"
        handleClickEvent = () => {
          history.push(`/groupchat/${fromId}`)
        }
        break
      case "leave-gruop":
        fromName = (groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」から退出しました"
        handleClickEvent = () => {
          history.push("/groupchat")
        }
        break
      case "delete-group":
        fromName = (groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」が削除されました"
        handleClickEvent = () => {
          history.push("/groupchat")
        }
        break
      default:
        break
    }
  return { displayWord, handleClickEvent }
}

export const handleNameError = (name, maxLength) => {
  let errorMessage = ""
  if (!name) errorMessage = "入力してください"
  else if (name.length > maxLength)
    errorMessage = `${maxLength}以内で入力してください`
  return errorMessage
}