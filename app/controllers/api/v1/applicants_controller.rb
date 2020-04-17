class Api::V1::ApplicantsController < ApplicationController

  before_action :set_applicant, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @applicants = Applicant.includes(:user).order('created_at DESC')

    if (params[:first_name] || params[:last_name] || params[:patronymic])
      @applicants = @applicants.where("lower(first_name) LIKE ?", "%" + params[:first_name].downcase + "%") if params[:first_name] != ""
      @applicants = @applicants.where("lower(last_name) LIKE ?", "%" + params[:last_name].downcase + "%") if params[:last_name] != ""
      @applicants = @applicants.where("lower(patronymic) LIKE ?", "%" + params[:patronymic].downcase + "%") if params[:patronymic] != ""
    end

    respond_with @applicants, status: :ok    
  end

  def show
    if @applicant
      respond_with @applicant, status: :ok
    else
      render json: { 
        error: @applicant.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end     
  end

  def create
    @applicant = Applicant.new(applicant_params)
    @applicant.user_id = current_user.id

    if @applicant.save
      respond_with @applicant, status: :ok
    else
      render json: { 
        error: @applicant.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end  

    rescue ActionController::ParameterMissing => e
      render json: {
        error: e,
        message: "Parametrler berilmedik..."
      },
      status: :unprocessable_entity    
  end

  def update
    if @applicant.update_attributes(applicant_params)
      respond_with @applicant, status: :ok
    else
      render json: { 
        error: @applicant.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @applicant.destroy
      respond_with @applicant, status: :ok
    else
      render json: { 
        error: @applicant.errors, 
        message: "Görkezilen şahsy bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_applicant
    @applicant = Applicant.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili şahys tapylmady..."
      }, 
      status: 404
  end

  def applicant_params
    params.require(:applicant).permit(:first_name, :last_name, :patronymic, :home_phone, :mobile_phone, :school_grade, :age, :notes)
  end

end
