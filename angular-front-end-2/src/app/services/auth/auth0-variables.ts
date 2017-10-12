interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'GlFGQP9HVzIjec0DnqyytQNl2Fh1V5uA',
    domain: 'code-reviewer.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
  };
  