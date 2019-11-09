class OauthApplicationController < ActionController::API
  def authorize
    application = Application.where(entitled: params[:entitled], secret: params[:secret])
    if(application)
      authorization_token = Authorization.where(application: application.first)
      if(authorization_token.count == 0)
        str = application.first.entitled + application.first.secret + DateTime.now.strftime("%Y%m%d%I%M")
        authorization_token = Authorization.new
        authorization_token.authenticity_token = Digest::MD5.hexdigest(str)
        authorization_token.application = application.first
        authorization_token.validity = 3600
        if(authorization_token.save)
          render json: authorization_token
        else
          render json: { :status => "401"}, :status => :unauthorized
        end
      else
        render json: { :status => "200"}
      end
      
    end
  end
end
