const actGetAnotations = async({ commit }) => {
    let anotations = {}
    if (localStorage.getItem('user-anotations') != 'undefined') {
        anotations = JSON.parse(localStorage.getItem('user-anotations'))
    }
    commit('SET_ANOTATIONS', anotations)
    return anotations
}

const actSetAnotations = async({ commit }, newItem) => {
    let anotations = []
    if (localStorage.getItem('user-anotations') != 'undefined' && localStorage.getItem('user-anotations') != null) {
        anotations = JSON.parse(localStorage.getItem('user-anotations'))
    }
    let data = { id: anotations.length, text: newItem }
    anotations.push(data)
    localStorage.setItem('user-anotations', JSON.stringify(anotations))
    commit('SET_ANOTATIONS', anotations)
    return anotations
}

const actRemoveAnotations = async({ commit }, idItem) => {
    let anotations = []
    if (localStorage.getItem('user-anotations') != 'undefined' && localStorage.getItem('user-anotations') != null) {
        anotations = JSON.parse(localStorage.getItem('user-anotations'))
    }
    anotations = anotations.filter(anotations => anotations.id != idItem);
    localStorage.setItem('user-anotations', JSON.stringify(anotations))
    commit('SET_ANOTATIONS', anotations)
    return anotations
}

export {
    actGetAnotations,
    actSetAnotations,
    actRemoveAnotations
}