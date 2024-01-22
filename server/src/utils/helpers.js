export const isProduction = process.env.NODE_ENV === "production";

export const formatUserInfo = (user, aT) => {
  const finalObj = {
    userInfo: {},
  };

  if (aT) {
    finalObj.accessToken = aT;
  }

  const data = user.toObject();
  const validKeys = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "address",
    "role",
    "cart",
    "wishlist",
  ];

  for (const key in data) {
    if (validKeys.includes(key)) {
      finalObj.userInfo[key] = data[key];
    }
  }

  return finalObj;
};

export const formatAdminInfo = (user, aT) => {
  const finalObj = {
    userInfo: {},
    accessToken: aT,
  };

  const data = user.toObject();
  const validKeys = ["firstName", "lastName", "email", "phoneNumber", "role"];

  for (const key in data) {
    if (validKeys.includes(key)) {
      finalObj.userInfo[key] = data[key];
    }
  }

  return finalObj;
};
