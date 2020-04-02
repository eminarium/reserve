class CreateShifts < ActiveRecord::Migration[5.2]
  def change
    create_table :shifts do |t|
      t.string :title
      t.text :notes
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
