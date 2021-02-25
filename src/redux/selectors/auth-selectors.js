export const getAuthUserIdSelector = (state) => {
    return state.auth.id;
};

export const getIsAuthSelector = (state) => {
    return state.auth.isAuth;
};

export const getAuthLoginSelector = (state) => {
    return state.auth.login;
};

export const getAuthAvatarSelector = (state) => {
    return state.auth.avatar;
};

export const getCaptchaSelector = (state) => {
    return state.auth.captcha;
};

export const getIsCaptchaNeedSelector = (state) => {
    return state.auth.isCaptchaNeed;
};


