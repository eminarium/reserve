class AddAgeToApplicant < ActiveRecord::Migration[5.2]
  def change
    add_column :applicants, :age, :integer
  end
end
