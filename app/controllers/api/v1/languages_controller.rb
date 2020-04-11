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
      render json: { 
        error: @language.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end  
  end

  def create

    @language = Language.new(language_params)
    @language.user_id = current_user.id

    if @language.save
      respond_with @language
    else
      render json: { 
        error: @language.errors, 
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
    if @language.update_attributes(language_params)
      respond_with @language, status: :ok
    else
      render json: { 
        error: @language.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end
  end

  def destroy
    if @language.destroy
      respond_with @language, status: :ok
    else
      render json: { 
        error: @language.errors, 
        message: "Görkezilen dili bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end
  end

  private 

  def set_language
    @language = Language.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili dil tapylmady..."
      }, 
      status: 404
  end

  def language_params
    params.require(:language).permit(:title, :notes)
  end

end
