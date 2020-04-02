class Api::V1::SubjectsController < ApplicationController

  before_action :set_subject, only: [:show, :update, :destroy]

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

  def set_subject
    @subject = Subject.find(params[:id])
  end

  def subject_params
    params.require(:subject).permit(:title, :level, :subject_category_id, :language_id, :notes)
  end

end
