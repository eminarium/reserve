class Api::V1::ApplicantsController < ApplicationController

  before_action :set_applicant, only: [:show, :update, :destroy]
  respond_to :json

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def set_applicant
    @applicant = Applicant.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili diňleýji tapylmady..."}
  end

  def applicant_params
    params.require(:applicant).permit(:first_name, :last_name, :patronymic, :home_phone, :mobile_phone, :photo_url, :birth_date, :notes)
  end

end
