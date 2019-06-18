export const ACTIONS = {
 CHANGE_COMPONENT: 'email/change_component',
 LOAD_INBOX: 'email/load_inbox',
 LOAD_SUGGESTIONS: 'email/load_suggestions',
 GET_EMAIL: 'email/get_email',
 SEND_EMAIL: 'email/send_email',
 GET_SEND_EMAILS: 'email/get_send_emails',
 CREATE_DRAFT: 'email/create_draft',
 UPDATE_DRAFT: 'email/update_draft',
 REMOVE_DRAFT: 'email/remove_draft',
 CLEAR: 'email/clear',
 CLEAR_SELECTED_EMAIL: 'email/clear_selected_email',
 SET_EMAIL_SELECTED: 'email/set_email_selected',
};

export const changeComponent = params => ({ type: ACTIONS.CHANGE_COMPONENT, ...params });

export const clear = () => ({ type: ACTIONS.CLEAR });

export const clearSelectedEmail = () => ({ type: ACTIONS.CLEAR_SELECTED_EMAIL });

export const loadInbox = emails => ({ type: ACTIONS.LOAD_INBOX, payload: emails });

export const loadSuggestions = emails => ({ type: ACTIONS.LOAD_SUGGESTIONS, payload: emails });

export const getSelectedEmail = email => dispatch => new Promise((resolve, reject) => {
 resolve(dispatch({ type: ACTIONS.GET_EMAIL, payload: email }))
})

export const sendEmail = email => ({ type: ACTIONS.SEND_EMAIL, payload: email });

export const createDraft = draft => ({ type: ACTIONS.CREATE_DRAFT, payload: draft });

export const updateDraft = draft => ({ type: ACTIONS.UPDATE_DRAFT, payload: draft });

export const removeDraft = draft => ({ type: ACTIONS.REMOVE_DRAFT, payload: draft });

export const setEmailSelected = email => ({ type: ACTIONS.SET_EMAIL_SELECTED, payload : email });