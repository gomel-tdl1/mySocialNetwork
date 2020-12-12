import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sideBarReducer from "./sidebar-reducer";

function getBirthdayString(date) {
    let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

let store = {
    _state: {
        users: [
            {
                id: 1,
                profilePage: {
                    profileDescription: {
                        name: 'Arina',
                        surname: 'Ivanova',
                        avatar: 'https://sun2.velcom-by-minsk.userapi.com/impf/c858224/v858224468/afea6/domWQuDwnNY.jpg?size=1679x1700&quality=96&proxy=1&sign=4c5145fd05ad6fbca9bb07c6ac725b81',
                        birthday: getBirthdayString(new Date(2001, 6, 14)),
                        location: 'Mogilev, Belarus',
                        education: 'GSMU',
                        webSite: null
                    },
                    postsData: [
                        {id: 1, message: 'kabzda prosto kak kruto', likesCount: 43},
                        {id: 2, message: 'eto prikolno', likesCount: 76}
                    ],
                    newPostText: ''
                },
                dialogsPage: {
                    messagesData: [
                        {
                            interlocutorId: 1,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'},
                                {id: 4, message: 'oyy?', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 2,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 3,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 4,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 5,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        }
                    ],
                    messageText: ''
                },
                sideBar: {
                    views: [5, 2, 3]
                }
            },
            {
                id: 2,
                profilePage: {
                    profileDescription: {
                        name: 'Ilya',
                        surname: 'Taldykin',
                        avatar: 'https://sun2.velcom-by-minsk.userapi.com/c855232/v855232866/106acd/yIVKUNKmgfY.jpg',
                        birthday: getBirthdayString(new Date(2000, 0, 21)),
                        location: 'Gent, Belgium',
                        education: 'GSTU',
                        webSite: 'https://gomel-tdl1-shelter.netlify.app'
                    },
                    postsData: [],
                    newPostText: ''
                },
                dialogsPage: {
                    messagesData: [
                        {
                            interlocutorId: 1,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'},
                                {id: 4, message: 'oyy?', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 2,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 3,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 4,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 5,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        }
                    ],
                    messageText: ''
                },
                sideBar: {
                    views: [1, 5, 3]
                }
            },
            {
                id: 3,
                profilePage: {
                    profileDescription: {
                        name: 'Daniel',
                        surname: 'Bondarenko',
                        avatar: 'https://sun9-73.userapi.com/impf/c854532/v854532471/ae0b/lhY7_MxVUv4.jpg?size=1536x2048&quality=96&proxy=1&sign=5db7444735ab438f75e0f92aa8acf5f0',
                        birthday: getBirthdayString(new Date(2001, 4, 24)),
                        location: 'Smolensk, Russia',
                        education: 'SSMU',
                        webSite: null
                    },
                    postsData: [
                        {id: 1, message: 'React', likesCount: 43},
                        {id: 2, message: 'eto', likesCount: 76},
                        {id: 3, message: 'kruto', likesCount: 15},
                        {id: 4, message: 'Dimich', likesCount: 32},
                        {id: 5, message: 'top', likesCount: 87}
                    ],
                    newPostText: ''
                },
                dialogsPage: {
                    messagesData: [
                        {
                            interlocutorId: 1,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'},
                                {id: 4, message: 'oyy?', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 2,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 3,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 4,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 5,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        }
                    ],
                    messageText: ''
                },
                sideBar: {
                    views: [1, 2, 4]
                }
            },
            {
                id: 4,
                profilePage: {
                    profileDescription: {
                        name: 'Andrew',
                        surname: 'Ryabtsev',
                        avatar: 'https://sun9-63.userapi.com/impg/lRByKuTJM11ForAGkU0TkmhidmM2miJNpsIqpg/qZr6hYoueIQ.jpg?size=1612x2160&quality=96&proxy=1&sign=0896a68ac3e0c606ef42847b822e8f2c',
                        birthday: getBirthdayString(new Date(1999, 9, 23)),
                        location: 'Gomel, Belarus',
                        education: 'GSTU',
                        webSite: null
                    },
                    postsData: [
                        {id: 1, message: 'React kabzda prosto kak kruto', likesCount: 43},
                        {id: 2, message: 'React eto prikolno', likesCount: 76},
                        {id: 3, message: 'Dimich top', likesCount: 15},
                        {id: 4, message: 'I love react!', likesCount: 32},
                        {id: 5, message: 'Haahahahahahaha', likesCount: 87}
                    ],
                    newPostText: ''
                },
                dialogsPage: {
                    messagesData: [
                        {
                            interlocutorId: 1,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'},
                                {id: 4, message: 'oyy?', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 2,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 3,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 4,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 5,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        }
                    ],
                    messageText: ''
                },
                sideBar: {
                    views: [1, 2, 3]
                }
            },
            {
                id: 5,
                profilePage: {
                    profileDescription: {
                        name: 'Jenna',
                        surname: 'Kimberly',
                        avatar: 'https://sun9-51.userapi.com/McfOiZ81I8LVm_wjVri9Fr19p_wgXNdrS1VjUg/JzLQiM8BaEU.jpg',
                        birthday: getBirthdayString(new Date(1995, 3, 18)),
                        location: 'Madrid, Spain',
                        education: null,
                        webSite: null
                    },
                    postsData: [
                        {id: 1, message: 'kak kruto', likesCount: 43},
                        {id: 2, message: 'LALA', likesCount: 76}
                    ],
                    newPostText: ''
                },
                dialogsPage: {
                    messagesData: [
                        {
                            interlocutorId: 1,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'},
                                {id: 4, message: 'oyy?', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 2,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        },
                        {
                            interlocutorId: 3,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 4,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'},
                                {id: 3, message: 'La lala?', who: 'you'}
                            ]
                        },
                        {
                            interlocutorId: 5,
                            data: [
                                {id: 1, message: 'Hi!', who: 'you'},
                                {id: 2, message: 'Hello!', who: 'me'}
                            ]
                        }
                    ],
                    messageText: ''
                },
                sideBar: {
                    views: [2, 3, 4]
                }
            }
        ],
        getProfile(id) {
            --id;
            return id !== 0 && !id ? this.users : this.users[id];
        }
    },
    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action, id) {
        const user = this._state.getProfile(id);
        user.profilePage = profileReducer(user.profilePage, action);
        user.dialogsPage = dialogsReducer(user.dialogsPage, action);
        user.sideBar = sideBarReducer(user.sideBar,action);
        this._callSubscriber(id, this._state);
    }
};


window.state = store.getState();

export default store;