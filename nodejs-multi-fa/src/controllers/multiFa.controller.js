import {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
} from "../utils/2fa.js";
import { isNumeric } from "../utils/validation.js";

export const Get_Code_API = async (req, res) => {
  try {
    const { serviceName, username } = req.query;
    if (!serviceName || serviceName.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Params Failure!",
        data:null,
        error:"ServiceName Invalid"

      });
    }
    if (!username || username.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Params Failure!",
        data:null,
        error:'Username Invalid'

      });
    }


    const secret = generateUniqueSecret();
    const otpAuth = generateOTPToken(username, serviceName, secret);
    const generateQRCodeResponse = await generateQRCode(otpAuth);
    if(generateQRCodeResponse.success){
      res.json({
        success: true,
        message: "Get Code Successfully!",
        data:{
         qrCode:generateQRCodeResponse.data,
         secret,
        },
        error:null,
        request:{
          serviceName,
          username,
        }
      });
    }else{
      res.json({
        success: false,
        message: "Get Code Failure!",
        serviceName,
        username,
        secret,
        data:null,
        error:generateQRCodeResponse.error,
        request:{
          serviceName,
          username,
        }
      });
    }

  } catch (error) {
    const { serviceName, username } = req.query;
    if(serviceName && username){
      if (error?.response?.data) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: error.response.data,
          request:{
            serviceName,
            username,
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: JSON.stringify(error),
          request:{
            serviceName,
            username,
          }
        });
      }
    }else{
      if (error?.response?.data) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: error.response.data
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: JSON.stringify(error)
        });
      }
    }

  }
};

export const Verify_Code_API = async (req, res) => {
  try {
    const { secret, token } = req.body;

    if (!secret || secret.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Params Failure!",
        data:null,
        error:'Secret Invalid'
      });
    }
    if (!token || token.length <6 || !isNumeric(token)) {
      return res.status(400).json({
        success: false,
        message: "Validation Params Failure!",
        data:null,
        error:'Token Invalid',
      });
    }
    const boolean = verifyOTPToken(token, secret);
    res.json({
      success: boolean,
      message:boolean ? 'Validation Successfully!' : 'Validation Failure!',
      data:null,
      error:null,
      request:{
        secret,
        token
      }
    });
  } catch (error) {
    const { secret, token } = req.body;
    if(secret && token){
      if (error?.response?.data) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: error.response.data,
          request:{
            secret,
            token
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: JSON.stringify(error),
          request:{
            secret,
            token
          }
        });
      }
    }else{
      if (error?.response?.data) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: error.response.data
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data:null,
          error: JSON.stringify(error)
        });
      }
    }

  }
};
