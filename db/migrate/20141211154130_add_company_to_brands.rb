class AddCompanyToBrands < ActiveRecord::Migration
  def change
    add_column :brands, :company, :string
  end
end
