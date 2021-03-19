import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-account-modal",
  templateUrl: "./add-account-modal.component.html",
  styleUrls: ["./add-account-modal.component.scss"],
})
export class AddAccountModalComponent {
  accountData = { name: "", type: "", balance: "" };
  accountTypeOption = [
    { key: "checking", value: "Checking" },
    { key: "savings", value: "Saving" },
    { key: "cash", value: "Cash" },
    { key: "creditCard", value: "Credit Card" },
    { key: "lineOfCredit", value: "Line of Credit" },
  ];

  constructor(public dialogRef: MatDialogRef<AddAccountModalComponent>) {}

  save(): void {
    this.dialogRef.close({
      accountData: this.accountData,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
