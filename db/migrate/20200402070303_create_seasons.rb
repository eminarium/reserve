class CreateSeasons < ActiveRecord::Migration[5.2]
  def change
    create_table :seasons do |t|
      t.string :title
      t.integer :order_no
      t.date :start_date
      t.date :end_date
      t.date :return_deadline
      t.text :notes

      t.timestamps
    end
    add_index :seasons, :order_no, unique: true
  end
end
