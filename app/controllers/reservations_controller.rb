class ReservationsController < ApplicationController
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

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:applicant_id, :season_id, :shift_id, :subject_id, :is_registered, :is_sms_sent, :is_called, :notes)
  end

end
