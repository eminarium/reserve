class Api::V1::SubjectTestsController < ApplicationController
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

  def set_subject_test
    @subject_test = SubjectTest.find(params[:id])
  end

  def subject_test_params
    params.require(:subject_test).permit(:applicant_id, :subject_id, :season_id, :test_date, :result, :notes)
  end
  
end
