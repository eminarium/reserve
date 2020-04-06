class Api::V1::ShiftsController < ApplicationController

  before_action :set_shift, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @shifts = Shift.order('start_time ASC')
    respond_with @shifts, status: :ok
  end

  def show
    if @shift
      respond_with @shift, status: :ok
    else
      render json: { 
        error: @shift.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end      
  end

  def create
    @shift = Shift.create(shift_params)
    @shift.user_id = current_user.id

    if @shift.save
      respond_with @shift
    else
      render json: { 
        error: @shift.errors, 
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
    if @shift.update_attributes(shift_params)
      respond_with @shift, status: :ok
    else
      render json: { 
        error: @shift.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @shift.destroy
      respond_with @shift, status: :ok
    else
      render json: { 
        error: @shift.errors, 
        message: "Görkezilen wagty (smenany) bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_shift
    @shift = Shift.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili wagt (seans) tapylmady..."
      }, 
      status: 404
  end

  def shift_params
    params.require(:shift).permit(:title, :start_time, :end_time, :notes)
  end

end
