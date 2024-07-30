declare module 'fastify-jwt' {
    import { FastifyPluginCallback } from 'fastify';
  
    interface FastifyJWTOptions {
      secret: string | Buffer;
      sign?: SignOptions;
      verify?: VerifyOptions;
      decode?: DecodeOptions;
    }
  
    interface SignOptions {
      expiresIn?: string | number;
      notBefore?: string | number;
      audience?: string | string[];
      subject?: string;
      issuer?: string;
      jwtid?: string;
      mutatePayload?: boolean;
      noTimestamp?: boolean;
      header?: object;
      encoding?: string;
    }
  
    interface VerifyOptions {
      algorithms?: string[];
      audience?: string | string[];
      clockTimestamp?: number;
      clockTolerance?: number;
      issuer?: string | string[];
      ignoreExpiration?: boolean;
      ignoreNotBefore?: boolean;
      jwtid?: string;
      subject?: string;
      maxAge?: string | number;
    }
  
    interface DecodeOptions {
      complete?: boolean;
      json?: boolean;
    }
  
    interface FastifyJWT {
      sign: (payload: object, options?: SignOptions) => string;
      verify: (token: string, options?: VerifyOptions) => object | string;
      decode: (token: string, options?: DecodeOptions) => null | object | string;
    }
  
    const fastifyJwt: FastifyPluginCallback<FastifyJWTOptions>;
    export default fastifyJwt;
  }
  