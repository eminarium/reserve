class RemoveSchoolYearFromApplicants < ActiveRecord::Migration[5.2]
  def change
    remove_column :applicants, :school_year
  end
end
