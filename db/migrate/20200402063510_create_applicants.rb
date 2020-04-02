class CreateApplicants < ActiveRecord::Migration[5.2]
  def change
    create_table :applicants do |t|
      t.string :first_name
      t.string :last_name
      t.string :patronymic
      t.string :home_phone
      t.string :mobile_phone
      t.string :photo_url
      t.date :birth_date
      t.text :notes

      t.timestamps
    end

    add_index :applicants, :first_name
    add_index :applicants, :last_name
    add_index :applicants, :patronymic
    add_index :applicants, :home_phone
    add_index :applicants, :mobile_phone
  end
end
