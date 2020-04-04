class Api::V1::UsersController < ApplicationController
#class Api::V1::UsersController < Devise::RegistrationsController
  load_and_authorize_resource
  before_action :set_user, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @users = User.order('username ASC')
    respond_with @users, status: :ok
  end

  def show
    if @user
      respond_with @user, status: :ok
    else
      respond_with @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    @user = User.create(user_params)
    #@user = User.new(user_params)

    if @user.save
      respond_with @user
    else
      respond_with @user.errors
    end
  end

  def update
    if @user.update_attributes(user_params)
      respond_with @user, status: :ok
    else
      respond_with @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      respond_with @user, status: :ok
    else
      respond_with @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :password, :email, :role)
  end

end
