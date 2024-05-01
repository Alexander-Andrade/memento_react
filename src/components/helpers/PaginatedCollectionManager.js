export const createItem = (collection, newItem) => {
  return [newItem, ...collection]
}

export const updateItem = (collection, newItem) => {
  const index = collection.findIndex(item => item.id === newItem.id)
  const newCollection = [...collection]
  newCollection[index] = newItem
  return newCollection
}

export const deleteItem = (collection, itemId) => {
  const index = collection.findIndex(item => item.id === itemId)
  const newCollection = [...collection]
  newCollection.splice(index, 1)
  return newCollection
}
