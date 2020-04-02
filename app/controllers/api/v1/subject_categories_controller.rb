class Api::V1::SubjectCategoriesController < ApplicationController
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
  end

  def subject_category_params
    params.require(:subject_category).permit(:title, :is_kids, :notes)
  end

end
