class Api::V1::LanguagesController < ApplicationController

  before_action :set_language, only: [:show, :update, :destroy]
  respond_to :json

  
  def index
    @languages = Language.order('title ASC')
    respond_with @languages, status: :ok
  end

  def show
    if @language
      respond_with @language, status: :ok
    else
      respond_with @language.errors, status: :unprocessable_entity
    end  
  end

  def create
    @language = Language.create(language_params)

    if @language.save
      respond_with @language
    else
      respond_with @language.errors
    end  
  end

  def update
    if @language.update_attributes(language_params)
      respond_with @language, status: :ok
    else
      respond_with @language.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @language.destroy
      respond_with @language, status: :ok
    else
      respond_with @language.errors, status: :unprocessable_entity
    end
  end

  private 

  def set_language
    @language = Language.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili dil tapylmady..."}
  end

  def language_params
    params.require(:language).permit(:title, :notes)
  end

end
