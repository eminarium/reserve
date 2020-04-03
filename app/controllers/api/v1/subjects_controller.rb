class Api::V1::SubjectsController < ApplicationController

  before_action :set_subject, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @subjects = Subject.order('title ASC')
    respond_with @subjects, status: :ok    
  end

  def show
    if @subject
      respond_with @subject, status: :ok
    else
      render json: { 
        error: @subject.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end      
  end

  def create
    @subject = Subject.create(subject_params)

    if @subject.save
      respond_with @subject
    else
      render json: { 
        error: @subject.errors, 
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
    if @subject.update_attributes(subject_params)
      respond_with @subject, status: :ok
    else
      render json: { 
        error: @subject.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @subject.destroy
      respond_with @subject, status: :ok
    else
      render json: { 
        error: @subject.errors, 
        message: "Görkezilen dersi bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili ders tapylmady..."
      }, 
      status: 404
  end

  def subject_params
    params.require(:subject).permit(:title, :level, :subject_category_id, :language_id, :notes)
  end

end
