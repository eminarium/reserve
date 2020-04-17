class RemoveBirthDateFromApplicants < ActiveRecord::Migration[5.2]
  def change
    remove_column :applicants, :birth_date
  end
end
