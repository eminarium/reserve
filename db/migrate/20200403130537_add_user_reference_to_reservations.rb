class AddUserReferenceToReservations < ActiveRecord::Migration[5.2]
  def change
    add_reference :reservations, :user, foreign_key: true
  end
end
