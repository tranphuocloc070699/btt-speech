
import qrcode from 'qrcode'
import otplib from 'otplib'

/** Gọi ra để sử dụng đối tượng "authenticator" của thằng otplib */
const { authenticator } = otplib

/** Tạo secret key ứng với từng user để phục vụ việc tạo otp token.
  * Lưu ý: Secret phải được gen bằng lib otplib thì những app như
    Google Authenticator hoặc tương tự mới xử lý chính xác được.
  * Các bạn có thể thử để linh linh cái secret này thì đến bước quét mã QR sẽ thấy có lỗi ngay.
*/
const generateUniqueSecret = () => {
  return authenticator.generateSecret()
}

/** Tạo mã OTP token */
const generateOTPToken = (username, serviceName, secret) => {
  console.log({secret});
  return authenticator.keyuri(username, serviceName, secret)
}

/** Tạo QR code từ mã OTP để gửi về cho user sử dụng app quét mã */
const generateQRCode = async (otpAuth) => {
  try {
    const QRCodeImageUrl = await qrcode.toDataURL(otpAuth)
    return {
      success:true,
      data:QRCodeImageUrl
    };
  } catch (error) {
    if(error?.respose?.data){
      return {
        success:false,
        error:error.response.data
      }
    }else{
      return {
        success:false,
        error:JSON.stringify(error)
      }
    }
  }
}

/*
 * Kiểm tra mã OTP token có hợp lệ hay không
 */
const verifyOTPToken = (token, secret) => {
  return authenticator.verify({ token, secret })
}

export {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
}