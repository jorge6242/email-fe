import { ACTIONS } from "../Actions/emailActions";

const initialState = {
  element: null,
  title: "",
  inboxEmails: [],
  draftEmails: [],
  sendEmails: [],
  selectedEMail: {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  },
  loader: false,
  suggestions: [],
  selectedEmails: [],
};

const updateDraft = (state, payload) => {
 const draftEmailsPayload = payload;
 const { id } = draftEmailsPayload;
 const draftEmails = state.draftEmails.reduce((acc , draft) => {
  if (draft.id === id) {
   return [...acc, draftEmailsPayload ];
  } else {
   return [...acc, draft];
  }
  },[]);
  return { ...state, draftEmails };
}

const removeDraft = (state, payload) => {
 const draftEmailsPayload = payload;
 const { id } = draftEmailsPayload;
 const draftEmails = state.draftEmails.filter(draft => draft.id !== id);
  return { ...state, draftEmails };
}

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_COMPONENT:
      return {
        ...state,
        ...action.payload
      };
    case ACTIONS.LOAD_INBOX:
      return {
        ...state,
        inboxEmails: action.payload
      };
    case ACTIONS.LOAD_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    case ACTIONS.GET_EMAIL:
      return {
        ...state,
        selectedEMail: action.payload
      };
    case ACTIONS.SEND_EMAIL:
      state.sendEmails.push(action.payload);
      return {
        ...state,
        sendEmails: state.sendEmails
      };
    case ACTIONS.CREATE_DRAFT:
      state.draftEmails.push(action.payload);
      return {
        ...state,
        draftEmails: state.draftEmails
      };
     case ACTIONS.UPDATE_DRAFT:
       return updateDraft(state, action.payload);
     case ACTIONS.REMOVE_DRAFT:
       return removeDraft(state, action.payload);
    case ACTIONS.CLEAR:
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.CLEAR_SELECTED_EMAIL:
      return {
        ...state,
        selectedEMail: initialState.selectedEMail
      };
    case ACTIONS.SET_EMAIL_SELECTED:
      return {
        ...state,
        selectedEmails: action.payload
      };
    default:
      return state;
  }
};

export default emailReducer;
