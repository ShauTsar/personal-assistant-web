/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.24.4
// source: user.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ResetPasswordRequest,
 *   !proto.user.ResetPasswordResponse>}
 */
const methodDescriptor_UserService_ResetPassword = new grpc.web.MethodDescriptor(
  '/user.UserService/ResetPassword',
  grpc.web.MethodType.UNARY,
  proto.user.ResetPasswordRequest,
  proto.user.ResetPasswordResponse,
  /**
   * @param {!proto.user.ResetPasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ResetPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.user.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.ResetPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ResetPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.resetPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/ResetPassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ResetPassword,
      callback);
};


/**
 * @param {!proto.user.ResetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ResetPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.resetPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/ResetPassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ResetPassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.VerifyCodeRequest,
 *   !proto.user.VerifyCodeResponse>}
 */
const methodDescriptor_UserService_VerifyCode = new grpc.web.MethodDescriptor(
  '/user.UserService/VerifyCode',
  grpc.web.MethodType.UNARY,
  proto.user.VerifyCodeRequest,
  proto.user.VerifyCodeResponse,
  /**
   * @param {!proto.user.VerifyCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.VerifyCodeResponse.deserializeBinary
);


/**
 * @param {!proto.user.VerifyCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.VerifyCodeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.VerifyCodeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.verifyCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/VerifyCode',
      request,
      metadata || {},
      methodDescriptor_UserService_VerifyCode,
      callback);
};


/**
 * @param {!proto.user.VerifyCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.VerifyCodeResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.verifyCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/VerifyCode',
      request,
      metadata || {},
      methodDescriptor_UserService_VerifyCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ChangePasswordRequest,
 *   !proto.user.ChangePasswordResponse>}
 */
const methodDescriptor_UserService_ChangePassword = new grpc.web.MethodDescriptor(
  '/user.UserService/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.user.ChangePasswordRequest,
  proto.user.ChangePasswordResponse,
  /**
   * @param {!proto.user.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.user.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangePassword,
      callback);
};


/**
 * @param {!proto.user.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ChangeEmailRequest,
 *   !proto.user.ChangeEmailResponse>}
 */
const methodDescriptor_UserService_ChangeEmail = new grpc.web.MethodDescriptor(
  '/user.UserService/ChangeEmail',
  grpc.web.MethodType.UNARY,
  proto.user.ChangeEmailRequest,
  proto.user.ChangeEmailResponse,
  /**
   * @param {!proto.user.ChangeEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ChangeEmailResponse.deserializeBinary
);


/**
 * @param {!proto.user.ChangeEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.ChangeEmailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ChangeEmailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.changeEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/ChangeEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeEmail,
      callback);
};


/**
 * @param {!proto.user.ChangeEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ChangeEmailResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.changeEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/ChangeEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ChangeAvatarRequest,
 *   !proto.user.ChangeAvatarResponse>}
 */
const methodDescriptor_UserService_ChangeAvatar = new grpc.web.MethodDescriptor(
  '/user.UserService/ChangeAvatar',
  grpc.web.MethodType.UNARY,
  proto.user.ChangeAvatarRequest,
  proto.user.ChangeAvatarResponse,
  /**
   * @param {!proto.user.ChangeAvatarRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ChangeAvatarResponse.deserializeBinary
);


/**
 * @param {!proto.user.ChangeAvatarRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.ChangeAvatarResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ChangeAvatarResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.changeAvatar =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/ChangeAvatar',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeAvatar,
      callback);
};


/**
 * @param {!proto.user.ChangeAvatarRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ChangeAvatarResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.changeAvatar =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/ChangeAvatar',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeAvatar);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.LogoutRequest,
 *   !proto.user.LogoutResponse>}
 */
const methodDescriptor_UserService_Logout = new grpc.web.MethodDescriptor(
  '/user.UserService/Logout',
  grpc.web.MethodType.UNARY,
  proto.user.LogoutRequest,
  proto.user.LogoutResponse,
  /**
   * @param {!proto.user.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LogoutResponse.deserializeBinary
);


/**
 * @param {!proto.user.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.LogoutResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.LogoutResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/Logout',
      request,
      metadata || {},
      methodDescriptor_UserService_Logout,
      callback);
};


/**
 * @param {!proto.user.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.LogoutResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/Logout',
      request,
      metadata || {},
      methodDescriptor_UserService_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.RegisterRequest,
 *   !proto.user.RegisterResponse>}
 */
const methodDescriptor_UserService_Register = new grpc.web.MethodDescriptor(
  '/user.UserService/Register',
  grpc.web.MethodType.UNARY,
  proto.user.RegisterRequest,
  proto.user.RegisterResponse,
  /**
   * @param {!proto.user.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.user.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register,
      callback);
};


/**
 * @param {!proto.user.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.RegisterResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register);
};


module.exports = proto.user;

