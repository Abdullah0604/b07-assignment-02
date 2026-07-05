export const userDataValidation = (userData: Record<string, unknown>) => {
  let message = "";
  const { name, email, password, role } = userData;
  const roles = ["contributor", "maintainer"];

  if (!name) {
    return (message = "Name is required. Please provide your name");
  }

  if (!email) {
    return (message = "Email is required. Please provide your email");
  } else {
    if (email !== (email as string).toLowerCase()) {
      return (message = "All character of Email must be in lowercase.");
    }
    if (
      !(email as string).includes("@") ||
      !(email as string).includes(".com")
    ) {
      return (message = "Email should be included @ and .com");
    }
  }

  if (!password) {
    return (message = "Password is required. Please provide your password.");
  } else {
    if (!(password.toString().length >= 6)) {
      return (message = "Password must be at least 6 character");
    }
  }

  if (!role) {
    return (message =
      "Role is required. Please provide your role and remember role can be either contributor or maintainer.");
  } else {
    if (!roles.includes(role as string)) {
      return (message = "role must be either contributor or maintainer.");
    }
  }

  return message;
};
