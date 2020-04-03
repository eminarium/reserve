class AddUserReferenceToShifts < ActiveRecord::Migration[5.2]
  def change
    add_reference :shifts, :user, foreign_key: true
  end
end
