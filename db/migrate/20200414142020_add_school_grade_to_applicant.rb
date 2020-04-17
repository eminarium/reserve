class AddSchoolGradeToApplicant < ActiveRecord::Migration[5.2]
  def change
    add_column :applicants, :school_grade, :integer
  end
end
