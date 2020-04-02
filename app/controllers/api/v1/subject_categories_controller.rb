class Api::V1::SubjectCategoriesController < ApplicationController

  before_action :set_subject_category, only: [:show, :update, :destroy]
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

  def set_subject_category
    @subject_category = SubjectCategory.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili ders görnüşi tapylmady..."}
  end

  def subject_category_params
    params.require(:subject_category).permit(:title, :is_kids, :notes)
  end

end
