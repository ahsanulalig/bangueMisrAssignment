import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-create-account-modal",
  templateUrl: "./create-account-modal.component.html",
  styleUrls: ["./create-account-modal.component.scss"],
})
export class CreateAccountModalComponent {
  accountDetails = { name: "", type: "", balance: "" };

  constructor(public dialogRef: MatDialogRef<CreateAccountModalComponent>) {}

  saveAccount(): void {
    this.dialogRef.close({
      accountDetails: this.accountDetails,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
