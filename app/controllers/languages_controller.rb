class LanguagesController < ApplicationController
  
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

  def set_language
    @language = Language.find(params[:id])
  end

  def language_params
    params.require(:language).permit(:title, :notes)
  end

end
