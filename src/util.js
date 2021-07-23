const validateData = (schema, data) => {
  const { value, error } = schema.validate(data);
  if (error !== undefined) throw error;
  return value;
};

module.exports = {
  validateData,
};
