export const ACTIONS = {
 SET_EDIT: 'compose_form/set_edit',
 CLEAR: 'compose_form/clear',
};

export const setEdit = message => ({
 type: ACTIONS.SET_EDIT,
 payload: message
});

export const clear = () => ({
 type: ACTIONS.CLEAR
});