package hooks

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
)

func updateIsEnabledAnywhere(app *pocketbase.PocketBase, featureFlagID string) error {
	enabledConfigs, err := app.FindRecordsByFilter(
		"flag_environment_configs",
		"is_enabled = TRUE && feature_flag = {:featureFlagId}",
		"",
		1,
		0,
		dbx.Params{"featureFlagId": featureFlagID},
	)
	if err != nil {
		return err
	}

	// Fetch the feature flag record
	featureFlag, err := app.FindRecordById("feature_flags", featureFlagID)
	if err != nil {
		return err
	}

	// Set is_enabled_anywhere based on whether any configs are enabled
	isEnabledAnywhere := len(enabledConfigs) > 0
	featureFlag.Set("is_enabled_anywhere", isEnabledAnywhere)

	// Save the updated feature flag
	err = app.Save(featureFlag)
	if err != nil {
		return err
	}

	return nil
}
