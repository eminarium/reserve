class Api::V1::SubjectTestsController < ApplicationController

  before_action :set_subject_test, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @subject_tests = SubjectTest.order('test_date ASC')
    respond_with @subject_tests, status: :ok        
  end

  def show
    if @subject_test
      respond_with @subject_test, status: :ok
    else
      render json: { 
        error: @subject_test.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end      
  end

  def create
    @subject_test = SubjectTest.new(subject_test_params)
    @subject_test.user_id = current_user.id

    if @subject_test.save
      respond_with @subject_test
    else
      render json: { 
        error: @subject_test.errors, 
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
    if @subject_test.update_attributes(subject_test_params)
      respond_with @subject_test, status: :ok
    else
      render json: { 
        error: @subject_test.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @subject_test.destroy
      respond_with @subject_test, status: :ok
    else
      render json: { 
        error: @subject_test.errors, 
        message: "Görkezilen synagy bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end       
  end

  private

  def set_subject_test
    @subject_test = SubjectTest.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili synag tapylmady..."
      }, 
      status: 404
  end

  def subject_test_params
    params.require(:subject_test).permit(:applicant_id, :subject_id, :season_id, :test_date, :result, :notes)
  end
  
end
