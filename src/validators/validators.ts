// Define all validators here
const validators = {
  email: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),

  phone: (val: string) => /^\+?[0-9]{10,15}$/.test(val),

  url: (val: string) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(val),

  ipv4: (val: string) =>
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(?!$)|$){4}$/.test(val),

  hex: (val: string) => /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val),

  username: (val: string) => /^[a-zA-Z0-9_]+$/.test(val),

  password: (val: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(val),

  slug: (val: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val),

  date: (val: string) => /^\d{4}-\d{2}-\d{2}$/.test(val),

  time: (val: string) => /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(val),

  uuid: (val: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      val
    ),

  htmlTag: (val: string) => /^<\/?[a-z][\s\S]*>$/i.test(val),
} as const;


export type ValidatorKey = keyof typeof validators; 
export default validators;
