  const signUp = {
    type: 'Object',
    required: true,
    properties: {
      name: { type: 'string', required: true, pattern: '^[A-Za-z. -]+$', maxLength: 80 },
      email: { type: 'string', required: true, format: 'email', maxLength: 80 },
      password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
    },
  }
  
export default { signUp }
