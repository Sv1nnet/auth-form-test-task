const resolveClassName = (baseClassName, extraClassName) => {
  return `${baseClassName} ${extraClassName}`.trim();
}

export default resolveClassName;
