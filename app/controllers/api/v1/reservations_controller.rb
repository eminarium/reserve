class Api::V1::ReservationsController < ApplicationController

  before_action :set_reservation, only: [:show, :update, :destroy]
  respond_to :json

  def index
    if params[:applicant_id]
      @reservations = Reservation.where(applicant_id: params[:applicant_id]).order('created_at DESC').includes(:applicant, :season, :shift, :subject, :user)
    else
      @reservations = Reservation.order('created_at DESC').includes(:applicant, :season, :shift, :subject, :user)

      @reservations = @reservations.where(subject_id: params[:subject_id]) if !params[:subject_id].blank?
      @reservations = @reservations.where(shift_id: params[:shift_id]) if !params[:shift_id].blank?
      @reservations = @reservations.where(is_sms_sent: params[:is_sms_sent]) if !params[:is_sms_sent].blank?
      @reservations = @reservations.where(is_called: params[:is_called]) if !params[:is_called].blank?
      @reservations = @reservations.where(is_registered: params[:is_registered]) if !params[:is_registered].blank?
    end

    @reservations = @reservations.paginate(page: params[:page]) if !params[:page].blank?

    respond_with @reservations, status: :ok    
  end

  def report_list
    @reservations = Reservation.order('created_at DESC').includes(:applicant, :season, :shift, :subject, :user)

    @reservations = @reservations.where(subject_id: params[:subject_id]) if !params[:subject_id].blank?
    @reservations = @reservations.where(shift_id: params[:shift_id]) if !params[:shift_id].blank?
    @reservations = @reservations.where(is_sms_sent: params[:is_sms_sent]) if !params[:is_sms_sent].blank?
    @reservations = @reservations.where(is_called: params[:is_called]) if !params[:is_called].blank?
    @reservations = @reservations.where(is_registered: params[:is_registered]) if !params[:is_registered].blank?

    @reservations = @reservations.paginate(page: params[:page]) if !params[:page].blank?

    respond_with @reservations, status: :ok    
  end

  def show
    if @reservation
      respond_with @reservation, status: :ok
    else
      render json: { 
        error: @reservation.errors, 
        message: "Soralan maglumatlar talabala??yk d??l ..." 
      },
      status: :unprocessable_entity
    end      
  end

  def create

    @applicant = Applicant.find(params[:applicant_id])

    @reservation = @applicant.reservations.build(reservation_params)
    @reservation.user_id = current_user.id

    if @reservation.save
      respond_with @reservation
    else
      render json: { 
        error: @reservation.errors, 
        message: "Berlen maglumatlar talabala??yk d??l ..." 
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
    if @reservation.update_attributes(reservation_params)
      respond_with @reservation, status: :ok
    else
      render json: { 
        error: @reservation.errors, 
        message: "Berlen maglumatlar talabala??yk d??l ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @reservation.destroy
      respond_with @reservation, status: :ok
    else
      render json: { 
        error: @reservation.errors, 
        message: "G??rkezilen rezerwi bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili rezerw tapylmady..."
      }, 
      status: 404
  end

  def reservation_params
    params.require(:reservation).permit(:applicant_id, :season_id, :shift_id, :subject_id, :is_registered, :is_sms_sent, :is_called, :notes)
  end

end
