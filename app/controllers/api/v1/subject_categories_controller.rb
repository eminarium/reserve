class Api::V1::SubjectCategoriesController < ApplicationController

  before_action :set_subject_category, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @subject_categories = SubjectCategory.order('title ASC')
    respond_with @subject_categories, status: :ok    
  end

  def show
    if @subject_category
      respond_with @subject_category, status: :ok
    else
      render json: { 
        error: @subject_category.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end      
  end

  def create
    @subject_category = SubjectCategory.create(subject_category_params)
    @subject_category.user_id = current_user.id

    if @subject_category.save
      respond_with @subject_category
    else
      render json: { 
        error: @subject_category.errors, 
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
    if @subject_category.update_attributes(subject_category_params)
      respond_with @subject_category, status: :ok
    else
      render json: { 
        error: @subject_category.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @subject_category.destroy
      respond_with @subject_category, status: :ok
    else
      render json: { 
        error: @subject_category.errors, 
        message: "Görkezilen ders görnüşini bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_subject_category
    @subject_category = SubjectCategory.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili ders görnüşi tapylmady..."
      }, 
      status: 404
  end

  def subject_category_params
    params.require(:subject_category).permit(:title, :is_kids, :notes)
  end

end
