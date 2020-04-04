#class ApplicationController < ActionController::API
class ApplicationController < ActionController::Base
    respond_to :json
    #protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!    
end
