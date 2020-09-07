const FOLDER_STRUCTURE = {
  members: [],
}

export default {
  namespaced: true,
  state: () => ({
    lists: [],
    folders: [],
    ordering: [],
  }),
  getters: {
    order: ({ ordering }) => ordering,
    query: ({ lists, folders }) => ({ isFolder, id }) => {
      return isFolder
        ? folders.find((folder) => folder.id === id)
        : lists.find((list) => list.id === id)
    },
  },
  mutations: {
    appendList(state, value) {
      state.lists = [...state.lists, value]
    },
    appendFolder(state, value) {
      state.folders = [
        ...state.folders,
        {
          ...value,
          ...FOLDER_STRUCTURE,
        },
      ]
    },
    appendOrdering(state, { isFolder, id }) {
      state.ordering = [
        ...state.ordering,
        {
          id,
          isFolder,
        },
      ]
    },
    updateOrdering(state, value) {
      state.ordering = value
    },
    updateFolder(state, { id, value }) {
      let selectedFolder = state.folders.find((folder) => folder.id === id)
      selectedFolder.members = value
    },
  },
  actions: {
    append({ commit }, { folder, id, ...other }) {
      let isFolder = folder === 'true'

      commit(isFolder ? 'appendFolder' : 'appendList', {
        id,
        ...other,
      })
      commit('appendOrdering', {
        isFolder,
        id,
      })
    },
  },
}
