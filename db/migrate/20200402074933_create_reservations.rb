class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.references :applicant, foreign_key: true
      t.references :season, foreign_key: true
      t.references :shift, foreign_key: true
      t.references :subject, foreign_key: true
      t.boolean :is_registered
      t.boolean :is_sms_sent
      t.boolean :is_called
      t.text :notes

      t.timestamps
    end
  end
end
