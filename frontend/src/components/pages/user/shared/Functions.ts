const getDeadLine = (assignmentCreatedDate: Date) => {
  const leftDays = assignmentCreatedDate.getDay() - new Date().getDay();
  if (leftDays >= 2) {
    return leftDays.toString() + "d";
  } else if (leftDays == 1) {
    return "tomorrow";
  } else if (leftDays >= 0 && leftDays < 1) {
    return "today";
  } else {
    return "done";
  }
};

export { getDeadLine };
